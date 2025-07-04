import { DrivingHistory } from '@/api/drivingHistory';
import Pagination from '@/components/common/Pagination';
import { useDrivingHistory } from '@/hooks/pages/useDrivingHistory';
import { formatDate } from '@/utils/dateUtils';

import '@fortawesome/fontawesome-free/css/all.min.css';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react';
import { Car, Clock, Eye, Route } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DrivingLogPage = () => {
  const { drivingHistory, pagination } = useDrivingHistory();

  const navigate = useNavigate();

  const viewDetail = (log: DrivingHistory) => {
    navigate(`/manage/driving-log/${log.id}`, { state: { log } });
  };

  return (
    <div className='flex h-screen flex-col'>
      {/* Header */}
      <header className='border-b bg-white p-6'>
        <div className='flex items-center justify-between'>
          <h1 className='flex items-center gap-3 text-2xl font-bold text-gray-800'>
            <Route className='text-blue-500' />
            운행일지
          </h1>
        </div>
      </header>

      {/* Filters Section */}
      {/* <section className="p-6 bg-white border-b">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Car className="w-4 h-4 text-blue-500" />
                            차량 선택
                        </label>
                        <Select
                            placeholder="전체 차량"
                            value={filters.vehicle}
                            onChange={(e) => handleFilterChange("vehicle", e.target.value)}
                        >
                            <SelectItem key="sonata" value="소나타">소나타 (12가 3456)</SelectItem>
                            <SelectItem key="grandeur" value="그랜저">그랜저 (34나 5678)</SelectItem>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-500" />
                            운행시간
                        </label>
                        <Input
                            type="datetime-local"
                            value={filters.startDate}
                            onChange={(e) => handleFilterChange("startDate", e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-500" />
                            종료시간
                        </label>
                        <Input
                            type="datetime-local"
                            value={filters.endDate}
                            onChange={(e) => handleFilterChange("endDate", e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <User className="w-4 h-4 text-blue-500" />
                            운전자
                        </label>
                        <Select
                            placeholder="전체 운전자"
                            value={filters.driver}
                            onChange={(e) => handleFilterChange("driver", e.target.value)}
                        >
                            <SelectItem key="hong" value="홍길동">홍길동</SelectItem>
                            <SelectItem key="kim" value="김철수">김철수</SelectItem>
                        </Select>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button 
                        color="primary" 
                        startContent={<Search className="w-4 h-4" />}
                        onClick={applyFilters}
                    >
                        검색
                    </Button>
                    <Button 
                        variant="light" 
                        startContent={<RotateCcw className="w-4 h-4" />}
                        onClick={resetFilters}
                    >
                        초기화
                    </Button>
                </div>
            </section> */}

      {/* Driving Logs Table */}
      <div className='flex-1 overflow-auto bg-gray-50 p-6'>
        <div className='overflow-hidden rounded-lg bg-white shadow-sm'>
          <Table aria-label='운행일지 테이블'>
            <TableHeader>
              <TableColumn>
                <div className='flex items-center gap-2'>
                  <Clock className='h-4 w-4 text-blue-500' />
                  운행시간
                </div>
              </TableColumn>
              <TableColumn>
                <div className='flex items-center gap-2'>
                  <Car className='h-4 w-4 text-blue-500' />
                  차량정보
                </div>
              </TableColumn>
              <TableColumn>
                <div className='flex items-center gap-2'>
                  <Route className='h-4 w-4 text-blue-500' />
                  주행 거리
                </div>
              </TableColumn>
              <TableColumn>관리</TableColumn>
            </TableHeader>
            <TableBody>
              {(drivingHistory.data?.data ?? []).map((log) => (
                <TableRow key={log.id} className='hover:bg-gray-50'>
                  <TableCell>
                    <div className='text-sm text-gray-800'>{formatDate(log.driveStartedAt)}</div>
                    <div className='text-sm text-gray-500'>~ {formatDate(log.driveEndedAt)}</div>
                  </TableCell>
                  <TableCell>
                    <div className='font-medium text-gray-800'>{log.carName}</div>
                    <div className='text-sm text-gray-600'>{log.licenseNumber}</div>
                  </TableCell>
                  <TableCell>{(log.nextMileageSum - log.previousMileageSum) / 1000} km</TableCell>
                  <TableCell>
                    <Button
                      size='sm'
                      color='primary'
                      variant='light'
                      startContent={<Eye className='h-4 w-4' />}
                      onClick={() => viewDetail(log)}
                    >
                      상세보기
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {(drivingHistory.data?.data ?? []).length === 0 && (
            <div className='py-12 text-center'>
              <Route className='mx-auto mb-4 h-12 w-12 text-gray-400' />
              <p className='text-gray-500'>검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
        <Pagination
          currentPage={pagination.currentPage}
          pageSize={pagination.pageSize}
          totalElements={pagination.totalElements}
          onPageChange={pagination.onPageChange}
        />
      </div>
    </div>
  );
};

export default DrivingLogPage;
